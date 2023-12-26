import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Niloy's Blog",
	description: "A Personal Blog by Niloy",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="dark:bg-slate-800">
				<NavBar />
				{children}
			</body>
		</html>
	);
}
