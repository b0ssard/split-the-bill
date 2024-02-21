import { Flex, Link, Text, Image } from "@chakra-ui/react";
import linkedinImage from "../public/images/linkedin.png";
import githubImage from "../public/images/github.png";
import emailImage from "../public/images/email.png";
import whatsappImage from "../public/images/whatsapp.png";

interface LinkItem {
  label: string;
  href: string;
}

const links: LinkItem[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/victorbossard/",
  },
  {
    label: "GitHub",
    href: "https://github.com/b0ssard",
  },
  {
    label: "EMail",
    href: "mailto:victorquindere@gmail.com",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5585988812838",
  },
];

export default function Footer() {
  return (
    <Flex
      as="footer"
      align="center"
      justify="space-between"
      py="6"
      px="8"
      bg="#990000"
      color="#FFEE63"
      mt="10px"
      bottom="0"
      width="100%"
    >
      <Text fontSize="sm" fontWeight="semibold">
        Por Victor Bossard © {new Date().getFullYear()}.
      </Text>
      <Flex as="ul" listStyleType="none">
        {links.map((link) => (
          <Link
            key={link.href}
            mr="6"
            href={link.href}
            target="_blank"
            rel="noreferrer"
            display="inline-block"
          >
            <Image
              src={getImageSrc(link.label)}
              alt={link.label}
              width="24px"
              height="24px"
            />
          </Link>
        ))}
      </Flex>
    </Flex>
  );
}

function getImageSrc(label: string) {
  switch (label) {
    case "LinkedIn":
      return linkedinImage.src;
    case "GitHub":
      return githubImage.src;
    case "EMail":
      return emailImage.src;
    case "WhatsApp":
      return whatsappImage.src;
    default:
      return "";
  }
}
