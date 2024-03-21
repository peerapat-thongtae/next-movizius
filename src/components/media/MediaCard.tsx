import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"
import NotFoundImage from '@/assets/images/image-not-found.png'
import { FaStar } from "react-icons/fa6";
import ButtonMediaAccount from "./ButtonMediaAccount";
import { useAuth } from "@/shared/hocs/AuthProvider";
import { useMemo } from "react";
import PosterImage from "../common/PosterImage";
import { Tooltip } from 'react-tooltip'
import { useIMDB } from "@/shared/hooks/useMedia";
import { FaSpinner } from "react-icons/fa";
import { FaImdb } from "react-icons/fa"
import { SiThemoviedatabase } from "react-icons/si";

const MediaCard = (props: any) => {
  const item = props.item

  const disabledImdb = process.env.NODE_ENV !== 'development'
  const mediaType = props.mediaType || item.media_type || ''
  const imagePath = item.poster_path || item.profile_path

  const { response: imdbData, isLoading: isLoadingImdb } = useIMDB(item.imdb_id, mediaType, disabledImdb)

  const ratingObj = useMemo(() => {
    return {
      vote_average: imdbData?.vote_average || item.vote_average || 0,
      vote_count: imdbData?.vote_count || item.vote_count || 0,
    }
  }, [imdbData])

  const title = item.title || item.name

  const size = props.size || 'MEDIUM'

  const { isAuthenticated } = useAuth()

  const imageHeight = useMemo(() => {
    if(size === 'MEDIUM') {
      return `h-[26rem]`
    } else if (size === 'SMALL') {
      return 'h-[22rem]'
    } else {
      return 'h-auto'
    }
  }, [])


  const mediaYear = (item.release_date || item.first_air_date) ? dayjs(item.release_date || item.first_air_date).format('YYYY') : '-'
  return (
    // <Link href={`/${mediaType}/${item.id}`} className="">
    <div>
      <div
        className={`cursor-pointer group relative m-0 flex w-auto rounded-xl ring-gray-900/5 sm:mx-auto  ${imageHeight}`}
      >
        {isAuthenticated &&
          <div
            className="pointer-events-auto rounded-full bg-black px-1.5 py-1 opacity-100 absolute top-0 right-0 z-20 m-2 transition duration-300 ease-in-out group-hover:opacity-100"
          >
            <div className="flex items-center justify-center">
              <ButtonMediaAccount media={item} />
            </div>
          </div>
        }
        <div
          className="text-white font-bold text-sm rounded-full bg-black px-2 py-1 opacity-100 absolute top-0 left-0 z-20 m-2 transition duration-300 ease-in-out group-hover:opacity-100"
        >
          { mediaYear }
        </div>
        <div className="z-10 h-full w-full overflow-hidden rounded-xl  ">
          <PosterImage url={`/${mediaType}/${item.id}`} image_path={imagePath} />
        </div>
        <div
          className="bg-grey-90 px-2 py-1 absolute bottom-0 z-20 transition duration-300 ease-in-out opacity-0 group-hover:opacity-90 min-h-8 w-full rounded-xl rounded-t-none"
        >
          {isLoadingImdb ?
            <div className="flex justify-center items-center">
              <FaSpinner className="animate-spin text-yellow-500" />
            </div>
            :
            <div className="flex justify-between text-white font-bold text-sm">
              <div className="flex gap-2 align-middle items-center">
                {
                  !disabledImdb ?
                    <FaImdb size={22} color="yellow" />
                    :
                    <SiThemoviedatabase size={22} color="yellow" />
                }
                <span>
                  { ratingObj.vote_average ? ratingObj.vote_average?.toFixed(1) : '' }
                </span>
                <span><FaStar color="yellow" /></span>
              </div>
              <span>
                { ratingObj.vote_count?.toLocaleString() } Votes
              </span>
            </div>
          }
        </div>
      </div>
      <div className="truncate text-left text-md font-bold hover:cursor-pointer hover:text-yellow-500 py-2">
        <Tooltip id="my-tooltip" className="z-[99]"/>
        <span data-tooltip-id="my-tooltip"
          data-tooltip-content={title}
          data-tooltip-place="top"
        >
          { title }
        </span>
      </div>
    </div>
  )
}

export default MediaCard