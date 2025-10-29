import CVLOGO from "@/images/logo_text.png";
import Image from "next/image";

export default function Sidebar() {
  const navLinks = [
    { label: "Account", href: "#billing" },
    { label: "Generate", href: "#cv" },
  ];

  return (
    <>
      <section>
        <div className="container">
          <div className="py-4 px-5">
            <div className=" border-0 rounded-lg  flex items-center justify-between ">
              <div className="flex-shrink-0">
                <Image src={CVLOGO} alt="logo" className="w-auto" height={40} />
              </div>

              <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-1">
                <nav className="gap-12 flex">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-white/50 text-md"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
