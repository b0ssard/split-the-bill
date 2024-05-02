import { useColorMode, IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

export default function ColorModeSwitcher() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <motion.div whileTap={{ scale: 2 }}>
      <IconButton
        aria-label="Toggle dark mode"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        marginTop="15px"
      />
    </motion.div>
  );
}
