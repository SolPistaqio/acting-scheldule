import { useTranslation } from "react-i18next"

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "lv", name: "Latviešu" },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value)
  }

  return (
    <div className="flex items-center gap-2 p-4">
      <label htmlFor="language-select" className="text-sm font-medium">
        Language / Valoda:
      </label>
      <select
        id="language-select"
        value={i18n.language}
        onChange={handleLanguageChange}
        className="rounded-md border border-gray-300 px-2 py-1 text-sm"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}
