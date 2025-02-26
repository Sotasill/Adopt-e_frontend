import { Helmet } from "react-helmet-async";
import { useTranslatedContent } from "../../redux/hooks/useTranslatedContent";
import { PAGE_TITLES } from "../../constants/pageTitles";

const PageTitle = ({ pageKey }) => {
  const { t } = useTranslatedContent();
  const title = PAGE_TITLES[pageKey] || "Adopt-e";

  return (
    <Helmet>
      <title>{title ? `${title} | Adopt-e` : "Adopt-e"}</title>
    </Helmet>
  );
};

export default PageTitle;
