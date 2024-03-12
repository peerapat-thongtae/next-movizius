import { useAuth } from "@/shared/hocs/AuthProvider"
import useMediaAccountState from "@/shared/hooks/useMediaAccountState"
import Popper from '@mui/material/Popper';
import { ClickAwayListener } from '@mui/material';
import { FaCheck, FaSpinner, FaStar } from "react-icons/fa"
import { useState } from "react";
import { MdBookmarkAdd, MdStarRate } from "react-icons/md";

const ButtonMediaAccount = (props: any) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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

  const iconState = () => {
    const color =  accountState?.rated
     || accountState?.watchlist
     || isLoading ? 'yellow' : 'white'
    if(isLoading) {
      return <FaSpinner className="animate-spin" color={color} />
    }
    if(mediaStatus() !== 'watched') {
      return <FaStar size={20} className={`${isLoading && 'animate-spin'} stroke-black stroke-[20px]`} color={color} />
    } else {
      return <FaCheck size={20} className={`${isLoading && 'animate-spin'} stroke-black stroke-[20px]`} color={color} />
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const clickWatchlist = () => {
    // setLoading(true);
    setAnchorEl(null);
    addToWatchlist(!accountState?.watchlist);
    // movie.my_states = new_state;
  }

  const clickWatched = () => {
    setAnchorEl(null);
    addRated(10);
  }
  return (
    <>
      <button className="" onClick={handleClick}> 
        {iconState()}
      </button> 
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        className="z-[99]"
      >
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <div
            aria-describedby={id}
            className="mt-2 w-100 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[9999]"
          >
            <div className="py-1" role="">
              <div
                className="text-gray-700 hover:bg-gray-200 block px-4 py-2 text-sm cursor-pointer"
                role="menuitem"
                id="menu-item-1"
                // onClick={clickWatchlist}
                onClick={clickWatchlist}
              >
                <div className="flex items-center gap-1">
                  <MdBookmarkAdd size={20} className={`${mediaStatus() === 'watchlist' ? 'text-yellow-500' : 'text-black'}`} />
                  <span>Watchlist</span>
                </div>
              </div>
              <div
                className="text-gray-700 hover:bg-gray-200 block px-4 py-2 text-sm cursor-pointer"
                role="menuitem"
                id="menu-item-2"
                // onClick={() => { props.setShowPopOverRating(true); props.setShowPopOver(false)}}
                onClick={clickWatched}
              >
                <div className="flex items-center gap-1">
                  <MdStarRate size={20} className={`${mediaStatus() === 'watched' ? 'text-yellow-500' : 'text-black'}`} />
                  <span>
                    Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ClickAwayListener>
      </Popper>
      
    </>
    
  )
}

export default ButtonMediaAccount