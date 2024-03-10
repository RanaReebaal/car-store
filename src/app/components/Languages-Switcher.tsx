"use client"
import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";

const COOKIE_NAME = "googtrans";

interface LanguageDescriptor {
  name: string;
  title: string;
}

declare global {
  namespace globalThis {
    var __GOOGLE_TRANSLATION_CONFIG__: {
      languages: LanguageDescriptor[];
      defaultLanguage: string;
    };
  }
}

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  const [languageConfig, setLanguageConfig] = useState<any>();

  useEffect(() => {
    const cookies = parseCookies()
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue;
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }
    if (global.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
    }
    if (languageValue) {
      setCurrentLanguage(languageValue);
    }
    if (global.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
    }
  }, []);

  if (!currentLanguage || !languageConfig) {
    return null;
  }

  const switchLanguage = (lang: string) => () => {
    setCookie(null, COOKIE_NAME, "/auto/" + lang)
    window.location.reload();
  };

  return (
    <>
      <div className="flex">
      <div className="group relative cursor-pointer bg-gray-200 rounded-t-2xl lg:ml-2 md:ml-0">
          <div className="flex items-center justify-between space-x-1 px-3">
            {/* Display selected language in "Select Language" title */}
            <a className="menu-hover py-2 lg:text-base md:text-sm sm:text-xs font-medium text-gray-500">
              {currentLanguage ? languageConfig.languages.find(
                  (lang:any) => lang.name === currentLanguage
              )?.title || currentLanguage : "Select Language"}
            </a>
            {/* Dropdown icon */}
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                className="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </div>
          <div className="invisible text-center absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible rounded-b-2xl">
            {languageConfig.languages.map((ld: LanguageDescriptor, i: number) => (
              <>
                {currentLanguage === ld.name ||
                  (currentLanguage === "auto" &&
                    languageConfig.defaultLanguage === ld) ? (
                  <span key={`l_s_${ld}`} className="my-2 block border-b hover:bg-gray-200 hover:border-gray-300 border-gray-200 py-1 font-semibold md:mx-2 text-orange-500">
                    {ld.title}
                  </span>
                ) : (
                  <a
                    key={`l_s_${ld}`}
                    onClick={switchLanguage(ld.name)}
                    className="my-2 block border-b hover:bg-gray-200 hover:border-gray-300 border-gray-200 shadow-2xl py-1 font-semibold text-gray-500 hover:text-black md:mx-2 hover:scale-110"
                  >
                    {ld.title}
                  </a>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export { LanguageSwitcher, COOKIE_NAME };

