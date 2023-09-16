import { httpClient } from "@/app/providers/http.provider";

export default function PopularTags() {
  const getTags = async () => {
    try {
      const response = await httpClient.get("/tags");
      console.log((response: any) => response.json());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="float-right max-w-[25%] mt-[1.5rem]">
      <p className="mb-[0.2rem]">Popular Tags</p>

      <div className="flex flex-wrap">
        <a
          href="#"
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          welcome
        </a>
        <a
          href="#"
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          implementations
        </a>
        <a
          href="#"
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          introduction
        </a>
        <a
          href="#"
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          codebaseShow
        </a>
        <a
          href="#"
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          ipsum
        </a>
        <a
          href="#"
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          qui
        </a>
        <a
          href="#"
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          cupiditate
        </a>
        <a
          href="#"
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          et
        </a>
        <a
          href="#"
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          quia
        </a>
        <a
          href="#"
          className="text-white text-[0.8rem] pt-[0.2rem] pb-[0.2rem] pr-[0.6rem] pl-[0.6rem] mr-[3px] mb-[0.2rem] rounded-[10rem] bg-tagsButton hover:bg-tagsButtonHover">
          deserunt
        </a>
      </div>
    </div>
  );
}
