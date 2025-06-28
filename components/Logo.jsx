"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LogoVessel() {
	const { theme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null; // evită problemele cu hidratarea

	const currentTheme = theme === "system" ? resolvedTheme : theme;
	const logoSrc = currentTheme === "dark" ? "/textLogoWhite.svg" : "/textLogoBlack.svg";

	return <Image src={logoSrc} width={130} height={100} alt="Vessel Logo" />;
}
