import Link from "next/link";
import { Input } from "../ui/input";
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "lucide-react";

export default function Footer() {
  const socials = [
    { icon: <TwitterIcon /> },
    { icon: <FacebookIcon /> },
    { icon: <InstagramIcon /> },
    { icon: <YoutubeIcon /> },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="flex justify-center p-20 pt-16 pb-16">
        <div className="flex gap-32">
          <div>
            <div className="text-5xl font-bold mb-4">Rentell</div>
            <div>Short Term Rentals</div>
            <div className="flex gap-6 mt-16">
              {socials.map(({ icon }, idx) => (
                <Link key={idx} href={"#"}>
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {/** Important Links */}
          <div>
            <h1 className="font-semibold text-lg mb-2">Links</h1>
            <ul className="text-sm flex flex-col gap-2">
              <li>About Us</li>
              <li>Career</li>
              <li></li>
            </ul>
          </div>

          {/** Category Links */}
          <div>
            <h1 className="font-semibold text-lg mb-2">Categories</h1>
            <ul className="text-sm flex flex-col gap-2">
              {/* <li><Link href="#"></Link></li> */}
              {[
                { label: "Mobile", href: "#" },
                { label: "Tables", href: "#" },
                { label: "Camera", href: "#" },
                { label: "Smartphones", href: "#" },
              ].map(({ label, href }, idx) => (
                <li key={idx}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/** Newsletter */}
          <div>
            <div>
              <h1 className="text-4xl">Join our Newsletter</h1>
              <div className="mt-2">To recieve updates on exciting deals</div>
            </div>
            <div className="mt-4 mb-4 flex items-stretch">
              <input
                type="text"
                className="rounded-l-md overflow-hidden px-4"
                placeholder="example@gmail.com"
              />
              <button className="bg-black rounded-r-md overflow-hidden py-2 px-4">Subscribe</button>
            </div>
            <div className="text-xs">
              By subscribing you agree to our{" "}
              <a className="underline">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mb-8 text-sm font-light">Copyright &copy; 2025</div>
    </footer>
  );
}
