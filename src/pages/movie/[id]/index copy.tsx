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

const LoadingDiv = () => {
  return (
    <div className="min-h-[90vh] h-full flex items-center justify-center w-full">
      <Loading />
    </div>
  )
}

const MovieDetailPage = (props: any) => {
  const router = useRouter()
  const id = router.query?.id as string
  console.log('id', id)
  const { media, isLoading } = useMediaDetail(id, 'media')

  const render = () => {
    if(isLoading) {
      return <LoadingDiv />
    }

    if(media) {
      return <Detail media={media} />
    }
  }
  return (
    <>
      {
        render()
      }
    </>
  )
}


const Detail = ({ media }: any) => {
  const [isOpenTrailer, setIsOpenTrailer] = useState(false)
  const handleWatchlist = (status: any) => {

  }

  const handleWatched = (rating: number) => {
     
  }
  return (
    <div className="m-20 px-20 lg:px-8 text-center h-[auto]">
      <div className="flex items-start gap-24 lg:gap-16">
        <div className="h-[72vh] min-w-[22vw] w-[28vw] ">
          <PosterImage image_path={media?.poster_path} />
        </div>
        <div className="flex flex-col justify-start items-start w-[56vw]">
          <span className="text-4xl text-left items-start font-extrabold text-yellow-500 truncate mt-6">{media.title}</span>
          <div className="flex w-full justify-between items-start gap-2 mt-4">
            <div className="flex flex-col max-w-[100%]">
              <span className="flex gap-2 text-center items-center text-sm truncate text-gray-400">
                <span>{DateHelper.formatDate(media.release_date, 'DD/MM/YYYY')}</span>
                <span className="text-xl">|</span>
                <span>{DateHelper.toHoursAndMinutes(media.runtime)}</span>
                <span className="text-xl">|</span>
                <span>{media.original_language?.toUpperCase()}</span>
                <span className="text-xl">|</span>
                <span>{media.status}</span>
              </span>
              {/* Genres */}
              <div className="flex gap-2 mt-4">
                {media?.genres?.map((genre: any) => {
                  if (!genre) return;
                  return <button key={genre.id} className="cursor-pointer truncate px-2 py-0.5 text-center items-center rounded-lg text-xs bg-pink-700 hover:text-yellow-500 text-white font-bold">{genre.name}</button>
                })}
              </div>
              {/* Director */}
              <span className="text-md mt-4 flex gap-2 items-center">
                <span className="font-bold text-gray-400">Director</span>
                <Link href={`/person/${media.directors?.[0]?.id}`}>
                  <span className="">{media.directors?.[0]?.name}</span>
                </Link>
              </span>

              {/* Writer */}
              <span className="text-md mt-2 flex gap-2 items-center">
                <span className="font-bold text-gray-400">Writer</span>
                {media.writers?.[0] ?
                  <Link href={`/person/${media.writers?.[0]?.person?.id}`}>
                    <span className="">{media.writers?.[0]?.name || '-'}</span>
                  </Link>
                  :
                  '-'
                }
              
              </span>
            </div>
            <div className="w-auto mt-8">
              {/* <PercentageCircle media={media} percent={media.imdb_rating * 10} /> */}
            </div>
          </div>


          {/* Overview */}
          <span className="text-lg mt-6 font-bold">Overview</span>
          <p className="line-clamp-4 break-words mt-2 text-md text-gray-400 w-auto text-left">
            {media.overview}
          </p>
                
          {/* Collections  */}
          {/* <span className="text-md mt-6 flex gap-2 items-center">
                <span className="font-bold text-white text-lg">Collections</span>
                <span onClick={openModalCollection} className="cursor-pointer hover:text-yellow-500">{media?.collection_name || '-'}</span>
              </span> */}
                
          {/* Button Watch trailer */}
          <div className="mt-6">
            <div className="flex gap-4 items-center">
              <button onClick={() => setIsOpenTrailer(true)} className="border text-[#FFFDE3] text-base border-gray-300 py-2 px-5 flex flex-row items-center hover:bg-yellow-600 hover:border-yellow-600 mb-8 md:mb-0">
                <IoMdVideocam size={30} />
                <div className="ml-1 truncate">Watch Trailer</div>
              </button>
                    
            </div>
          </div>
              
          <div className="mt-6">
            <div className="flex gap-4 items-center">
              {media.account_status !== "watched" &&
                        <div>
                          <BsBookmarkFill onClick={() => handleWatchlist(!media?.watchlist)} className={`hover:text-yellow-500 cursor-pointer ${media.account_status === "watchlist" && 'text-yellow-500'}`} size={30} />
                        </div>
              }
              <div className="">
                {/* <Rating size="lg" onChange={(val: any) => handleWatched(val * 2)} value={media?.my_rated ? media?.my_rated / 2 : 0} /> */}
              </div>
            </div>
          </div>

          {/* <div className="mt-6 grid grid-cols-4 gap-12">
                  {media.production_companies?.map((company: any) => {
                    return (
                      <div className="h-[12vh] w-full">
                        <CompanyCard company={company} />
                      </div>
                    );
                  })}
                </div> */}
        </div>
      </div>
    </div>
  )
}

export default MovieDetailPage