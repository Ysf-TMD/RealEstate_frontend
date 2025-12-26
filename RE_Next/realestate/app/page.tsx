
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {FileText} from "lucide-react";


export default function Home() {
  return (
      <div className="flex justify-center items-center h-screen">

          <div className="flex flex-wrap cursor-pointer space-x-1 items-center gap-2 md:flex-row">
              <Link href={"/api/pdf"}>
                  <Button  variant="outline" className={"cursor-pointer"}>
                      Generate pdf
                      <FileText/>
                  </Button>
              </Link>




          </div>
      </div>

  );
}
