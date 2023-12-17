import Image from "next/image";

const Profile = () => {
	return (
		<section className="w-full mx-auto">
			<Image
				className="mx-auto border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mt-8"
				src="/images/profile_minified.jpg"
				width={200}
				height={200}
				alt="Niloy"
				priority
			/>
		</section>
	);
};

export default Profile;
