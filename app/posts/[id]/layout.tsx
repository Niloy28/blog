export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className="p-4 m-2">{children}</div>;
}
