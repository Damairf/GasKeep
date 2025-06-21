import Link from "next/link";
import HeaderLanding from "./component_landing/header_landing"
import BodyLanding from "./component_landing/body_landing";
import LayananLanding from "./component_landing/layanan_landing";
import TentangLanding from "./component_landing/tentang_landing"

export default function Home() {
  return (
    <div>
      <HeaderLanding />
      <BodyLanding />
      <LayananLanding />
      <TentangLanding />
    </div>
  );
}
