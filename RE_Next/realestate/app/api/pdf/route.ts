import puppeteer, {Browser} from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
import {NextResponse} from "next/server";
import {generateHTML, mockData} from "@/app/api/pdf/template";

// URL du fichier tar Chromium hébergé sur GitHub
// La version doit correspondre à celle de @sparticuz/chromium-min (143.0.0)
const chromiumPack = "https://github.com/Sparticuz/chromium/releases/download/v143.0.0/chromium-v143.0.0-pack.tar";

// Configure Chromium for serverless environments
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
            // En production, utiliser l'URL GitHub du fichier tar Chromium
            // chromium-min téléchargera et décompressera automatiquement le fichier
            try {
                executablePath = await chromium.executablePath(chromiumPack);
            } catch (error) {
                console.error('Error getting chromium executable path:', error);
                throw new Error(`Failed to get Chromium executable: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
        
        browser = await puppeteer.launch({
            args: isDev ? [] : chromium.args,
            defaultViewport: {
                width : 1920 ,
                height : 1080,
            },
            executablePath,
            headless: true,
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