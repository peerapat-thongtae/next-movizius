import styled from "styled-components"
import Loading from "@/components/common/Loading"
import PosterImage from "@/components/common/PosterImage"
import MediaCard from "@/components/media/MediaCard"
import { DateHelper } from "@/shared/helpers/date-helper"
import { useMediaDetail } from "@/shared/hooks/useMedia"
import Link from "next/link"
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { IoMdPerson, IoMdVideocam } from "react-icons/io";
import { BsBookmarkFill, BsBuilding } from "react-icons/bs";
import { MdMovie } from "react-icons/md";
import { useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { FaPlayCircle } from "react-icons/fa";
import ModalVideo from "react-modal-video"

export const MediaDetail = ({ media }: any) => {
  const [isOpenTrailer, setIsOpenTrailer] = useState(false)
  const handleWatchlist = (status: any) => {
   
  }
   
  const handleWatched = (rating: number) => {
        
  }
   
  const bgImage = `https://www.themoviedb.org/t/p/original/${media.backdrop_path}`
  const date = media.release_date || media.first_air_date;
  const title = media.title || media.name
  const release_date = DateHelper.formatDate(media.release_date || media.first_air_date, 'DD/MM/YYYY')
  const originalName = media.original_title || title || '-'
  return (
    <div className="">
      <ModalVideo
        channel="youtube"
        youtube={{ mute: 0, autoplay: 1 }}
        isOpen={isOpenTrailer}
        videoId={media.trailers?.[0]?.key}
        onClose={() => setIsOpenTrailer(false)}
      />
      <BGWrapper bgimage={bgImage } className="opacity-[0.8]">
        <div className="flex justify-center h-full items-center">
          <FaPlayCircle className="cursor-pointer hover:text-yellow-500" onClick={() => setIsOpenTrailer(true)} size={50} />
        </div>
      </BGWrapper>
      <div className="px-64 pb-24">
        <div className="flex justify-between">
          <span className="text-4xl text-left font-extrabold truncate ">{title}</span>
          <span className="text-4xl text-left font-extrabold truncate ">{release_date}</span>
        </div>
        <hr className="my-8" />
        <div className="flex gap-8">
          <div className="">
            <div className="h-full w-full">
              <PosterImage image_path={media?.poster_path} />
            </div>
          </div>
          <div className="w-full">
            <div className="pb-4">
              <div className="flex gap-2">
                {media?.genres?.map((genre: any) => {
                  if (!genre) return;
                  return <button key={genre.id} className="cursor-pointer truncate px-2 py-0.5 text-center items-center rounded-lg text-xs bg-pink-600 hover:text-yellow-500 text-white font-bold">{genre.name}</button>
                })}
              </div>
              {media.tagline &&
                 <div className="pt-4 text-sm">
                   { media.tagline }
                 </div>
              }
            </div>
            <hr className="" />
            <div className="py-4">
              <div className="text-2xl">Details</div>
              <div className="text-sm py-4">
                <div className="flex gap-2 py-1">
                  <span>Original Name:</span>
                  <span className="text-gray-400 ">{originalName}</span>
                </div>
                <div className="flex gap-2 py-1">
                  <span>Director:</span>
                  <span className="text-gray-400 hover:text-yellow-500 link">{media.directors?.[0]?.name}</span>
                </div>
                <div className="flex gap-2 py-1">
                  <span>Writers:</span>
                  <span className="text-gray-400 hover:text-yellow-500 link">{media.writers?.[0]?.name}</span>
                </div>
                <div className="flex gap-2 py-1">
                  <span>Language:</span>
                  <span className="text-gray-400 hover:text-yellow-500 link">{media.original_language?.toUpperCase()}</span>
                </div>
                <div className="flex gap-2 py-1">
                  <span>Statuse:</span>
                  <span className="text-gray-400 ">{media.status}</span>
                </div>
                <div className="flex gap-2 py-1">
                  <span>Release Date:</span>
                  <span className="text-gray-400 ">{release_date}</span>
                  <span className="text-gray-200 hover:text-yellow-500 cursor-pointer">See more..</span>
                </div>
                   
              </div>
            </div>
            <hr className="" />
            <div className="py-4">
              <div className="text-2xl">Overview</div>
              <div className="text-sm py-4">
                <p className="line-clamp-4 break-words text-sm text-gray-400 w-auto text-left">
                  {media.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
   
const BGWrapper = styled.div<{ bgimage: string }>`
     background: ${props => `linear-gradient(to bottom, rgba(4, 21, 45, 0) 0%, #111111 90%), url(${props.bgimage || ''})`};
     width: 100%;
     height: 68vh;
     background-size: cover;
`