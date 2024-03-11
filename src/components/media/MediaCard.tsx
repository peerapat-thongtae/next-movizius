import dayjs from "dayjs"
import Image from "next/image"
import Link from "next/link"
import NotFoundImage from '@/assets/images/image-not-found.png'
import { FaStar } from "react-icons/fa6";

const MediaCard = (props: any) => {
  const mediaType = props.mediaType || 'movie'
  const item = props.item
  
  const imagePath = item.poster_path || item.profile_path

  const title = item.title || item.name

  const ratingObj = {
    vote_average: item.vote_average || 0,
    vote_count: item.vote_count || 0,
  }

  const mediaYear = (item.release_date || item.first_air_date) ? dayjs(item.release_date || item.first_air_date).format('YYYY') : ''
  //   props.imageHeight ? `h-[70vh]` : 'h-96'`
  return (
    <Link href={`/${mediaType}/${item.id}`} className="">
      <div
        className={`cursor-pointer group relative m-0 flex w-auto rounded-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg ${props.imageHeight ? 'h-full' : 'h-[28rem]'}`}
      >
        <div
          className="pointer-events-auto rounded-full bg-black px-2 py-1 opacity-100 absolute top-0 right-0 z-20 m-2 transition duration-300 ease-in-out group-hover:opacity-100"
        >
          {/* <ButtonMediaAccount :media="item" :disabled-account-state="disabledAccountState" /> */}
        </div>
        <div
          // v-if="!showImageOnly && mediaYear && (mediaType === 'movie' || mediaType === 'tv')"
          className="text-white font-bold text-sm rounded-full bg-black px-2 py-1 opacity-100 absolute top-0 left-0 z-20 m-2 transition duration-300 ease-in-out group-hover:opacity-100"
        >
          { mediaYear }
        </div>
        <div className="z-10 h-full w-full overflow-hidden rounded-xl  ">
          <img
            // clasName="!showImageOnly && 'transition duration-300 group-hover:scale-110'"
            className="block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
            src={imagePath ? `https://image.tmdb.org/t/p/${props.imageHeight ? 'original' : 'w500'}${imagePath}` : ''} 
            alt={""}
          />
        </div>
        <div
        // v-if="!showImageOnly && (mediaType === 'movie' || mediaType === 'tv')"
          className="bg-grey-90 px-2 py-1 absolute bottom-0 z-20 transition duration-300 ease-in-out opacity-0 group-hover:opacity-90 min-h-8 w-full rounded-xl rounded-t-none"
        >
          {/* <div v-if="isLoading" class="flex justify-center items-center">
          <FontAwesomeIcon icon="fa fa-spinner spinner" spin color="yellow" />
        </div> */}
          <div className="flex justify-between text-white font-bold text-sm">
            <div className="flex gap-2 align-middle items-center">
              {/* <FontAwesomeIcon icon="fa fa-star" color="yellow" /> */}
              <FaStar color="yellow" />
              <span>
                { ratingObj.vote_average ? ratingObj.vote_average?.toFixed(1) : '' }
              </span>
            </div>
            <span>
              { ratingObj.vote_count?.toLocaleString() } Votes
            </span>
          </div>
        </div>
      </div>
      <div className="truncate text-left text-md font-bold hover:cursor-pointer hover:text-yellow-500 py-2">
        { title }
      </div>
    </Link>
  )
}

export default MediaCard