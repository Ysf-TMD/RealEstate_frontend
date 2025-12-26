import puppeteer, {Browser} from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import {NextResponse} from "next/server";
import {generateHTML, mockData} from "@/app/api/pdf/template";

// Configure Chromium for Vercel serverless environment
if (process.env.NODE_ENV !== "development") {
    chromium.setGraphicsMode = false;
}

export async function GET(){
    let browser: Browser | null = null  ;
    try {
        const isDev = process.env.NODE_ENV === "development";
        
        let executablePath: string;
        if (isDev) {
            executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
        } else {
            // In production, get the executable path from chromium
            try {
                executablePath = await chromium.executablePath();
            } catch (error) {
                console.error("Error getting chromium executable path:", error);
                throw new Error(`Failed to get Chromium executable path: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
        
        browser = await puppeteer.launch({
            args: isDev ? [] : chromium.args,
            defaultViewport: {
                width : 1920 ,
                height : 1080,
            },
            executablePath,
            headless: true
        });
        if (!browser) {
            throw new Error("Failed to launch browser")
        }
        const page = await browser.newPage();
        await page.setContent(generateHTML(mockData) , {waitUntil : "networkidle0"})
        const pdf = await page.pdf({
            format : "A4",
            printBackground : true ,
            margin : {
                top : "0px",
                right: '0px',
                bottom: '0px',
                left: '0px'
            }
        })
        return new NextResponse(Buffer.from(pdf), {
            headers : {
                "Content-Type" : "application/pdf",
                "Content-Disposition" : 'attachment; filename="property.pdf"',
            }
        })
    } catch (e) {
        console.error(e);
        return NextResponse.json(
            {
                error: "Failed to generate pdf",
                details: e instanceof Error ? e.message : String(e)},
            {status: 500}
        )
    }finally {
        if(browser){

            await browser.close();
        }
    }
}