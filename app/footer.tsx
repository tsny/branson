import { Footer } from "flowbite-react";

interface FooterProps {
    boins: Number
}

export default function BFooter(props: FooterProps) {

    return (
        <Footer container className="sticky bottom w-2/3 border-2 border-gray">
            <Footer.LinkGroup>
                You have {props.boins.toString()} Bitboins
            </Footer.LinkGroup>
            <Footer.LinkGroup>
                branson branson branson branson branson
            </Footer.LinkGroup>
        </Footer>
    );
}
