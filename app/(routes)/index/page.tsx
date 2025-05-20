"use clinet"

import BannerImg from "@/components/banner-img";
import ContainerPage from "@/components/container-page";
import ChooseGallery from "@/components/ui/choose-galleries";

export default function page(){

    return(
        <ContainerPage>
            <>
            <ChooseGallery/>
            <BannerImg/>
            </>
        </ContainerPage>
    )
}