import ArticleList from "../article-list/acrticle-list";
import PopularTags from "../popular-tags/popular-tags";

export default function ContainerPage() {
  return (
    <div className="flex flex-wrap w-[1140px] mx-auto">
      <ArticleList />
      <PopularTags />
    </div>
  );
}
