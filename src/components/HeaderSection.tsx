import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Flex, Link, Text, Image } from "@chakra-ui/react";
import linkedinImage from "../../public/images/linkedin.png";
import githubImage from "../../public/images/github.png";
import emailImage from "../../public/images/email.png";
import whatsappImage from "../../public/images/whatsapp.png";
import { LinkItem } from "@/shared/utils";

const links: LinkItem[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/victorbossard/",
    imageSrc: linkedinImage.src,
  },
  {
    label: "GitHub",
    href: "https://github.com/b0ssard",
    imageSrc: githubImage.src,
  },
  {
    label: "EMail",
    href: "mailto:victorquindere@gmail.com",
    imageSrc: emailImage.src,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5585988812838",
    imageSrc: whatsappImage.src,
  },
];

export default function Header() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ y: 0 });

    const timeout = setTimeout(() => {
      controls.start({ y: -100 });
    }, 1400);

    return () => clearTimeout(timeout);
  }, [controls]);

  return (
    <motion.header
      animate={controls}
      transition={{ duration: 0.5 }}
      whileHover={{ y: 0 }}
      onMouseLeave={() => controls.start({ y: -100 })}
      style={{ position: "fixed", width: "100%", zIndex: 999 }}
    >
      <Flex
        align="center"
        justify="space-between"
        py="6"
        px="8"
        bg="teal"
        bgGradient="linear(to-r, teal.400, teal.600)"
        borderRadius="lg"
        boxShadow="sm"
        color="white"
        width="100%"
        maxWidth="1200px"
        mx="auto"
      >
        <Text fontSize="sm" fontWeight="semibold">
          Por Victor Bossard © {new Date().getFullYear()}.
        </Text>
        <Flex as="ul" listStyleType="none">
          {links.map(({ label, href, imageSrc }) => (
            <Link
              key={href}
              mr="6"
              href={href}
              target="_blank"
              rel="noreferrer"
              display="inline-block"
            >
              <Image src={imageSrc} alt={label} width="24px" height="24px" />
            </Link>
          ))}
        </Flex>
      </Flex>
    </motion.header>
  );
}
