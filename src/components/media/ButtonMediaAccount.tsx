import { useAuth } from "@/shared/hocs/AuthProvider"
import useMediaAccountState from "@/shared/hooks/useMediaAccountState"
import { FaCheck, FaSpinner, FaStar } from "react-icons/fa"

const ButtonMediaAccount = (props: any) => {
  const media = props.media
  const mediaType = props.mediaType
  const disabledAccountState = props.disabledAccountState
  const { data: accountState, isLoading, addToWatchlist, addRated } = useMediaAccountState(media.id, mediaType || 'movie', disabledAccountState)

  const mediaStatus = () => {
    if (accountState) {
      if (accountState.watchlist === true)
        return 'watchlist'
      else if (accountState.rated)
        return 'watched'
      else
        return ''
    }
    return ''
  }

  const { isAuthenticated } = useAuth()

  const iconState = () => {
    const color =  accountState?.rated
     || accountState?.watchlist
     || isLoading ? 'yellow' : 'white'
    if(isLoading) {
      return <FaSpinner className="animate-spin" />
    }
    if(mediaStatus() !== 'watched') {
      return <FaStar size={20} className={`${isLoading && 'animate-spin'} stroke-black stroke-[20px]`} color={color} />
    } else {
      return <FaCheck size={20} className={`${isLoading && 'animate-spin'} stroke-black stroke-[20px]`} color={color} />
    }
  }
  return (
    <button className=""> 
      <span className="">{iconState()}</span>
    </button> 
  )
}

export default ButtonMediaAccount