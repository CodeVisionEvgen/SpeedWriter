import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import Section from "@/components/Section";

export default function Home() {
	return (
		<Section color=" bg-[rgba(0,0,0,0)]">
			<span><h3 className=" text-[35px]">A game about your typing speed.</h3></span>
		</Section >
	);
}
