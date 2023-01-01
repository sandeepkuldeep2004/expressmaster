import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/">
      <a>
      <span className="sr-only">Workflow</span>
      <img
          className="h-20 w-auto logo"
          src="../images/expressCommerceLogo.png"
          alt="Logo"
      />
      </a>
      
      {/* <a>
        <Image src="/logo.jpg" alt="Logo" width={300} height={50} />
      </a> */}
    </Link>
  );
}

export default Logo;
