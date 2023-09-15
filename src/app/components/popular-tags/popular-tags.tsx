"use client";
import axios from "axios";

export default function PopularTags() {
  const apiHref = "https://api.realworld.io/api/tags";

  const handleTagClick = async (tag: any) => {
    try {
      const response = await axios.post(apiHref, { tag });
    } finally {
    }
  };

  return (
    <div className="float-right max-w-[25%] mt-[1.5rem]">
      <p className="mb-[0.2rem]">Popular Tags</p>

      <div className="flex flex-wrap">
        <a
          href="#"
          onClick={() => handleTagClick("welcome")}
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          welcome
        </a>
        <a
          href="#"
          onClick={() => handleTagClick("implementations")}
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          implementations
        </a>
        <a
          href="#"
          onClick={() => handleTagClick("introduction")}
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          introduction
        </a>
        <a
          href="#"
          onClick={() => handleTagClick("codebaseShow")}
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          codebaseShow
        </a>
        <a
          href="#"
          onClick={() => handleTagClick("ipsum")}
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          ipsum
        </a>
        <a
          href="#"
          onClick={() => handleTagClick("qui")}
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          qui
        </a>
        <a
          href="#"
          onClick={() => handleTagClick("cupiditate")}
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          cupiditate
        </a>
        <a
          href="#"
          onClick={() => handleTagClick("et")}
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          et
        </a>
        <a
          href="#"
          onClick={() => handleTagClick("quia")}
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          quia
        </a>
        <a
          href="#"
          onClick={() => handleTagClick("deserunt")}
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          deserunt
        </a>
      </div>
    </div>
  );
}
