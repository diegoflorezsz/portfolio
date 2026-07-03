import { Desktop } from "@/components/Desktop";
import { LanguageProvider } from "@/i18n/language";

export default function Home() {
  return (
    <LanguageProvider>
      <Desktop />
    </LanguageProvider>
  );
}
