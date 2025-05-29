"use client";

import BannerImg from "@/components/banner-img";
import ContainerPage from "@/components/container-page";
import ChooseGallery from "@/components/ui/choose-galleries";

export default function HomePage() {
  return (
    <ContainerPage>
      <>
        <ChooseGallery />
        <BannerImg />
      </>
    </ContainerPage>
  );
}
