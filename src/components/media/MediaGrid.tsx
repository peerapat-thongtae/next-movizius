import Loading from "../common/Loading";
import MediaCard from "./MediaCard"
import { Pagination } from '@mantine/core';

interface IMediaGridProps {
     items: [],
     page: number,
     isLoading: boolean,
     setPage: Function,
     totalResults: number,
     totalPages: number,
     mediaType?: 'movie' | 'tv' | 'person' | 'multi'
     gridCols?: number
     size?: 'LARGE' | 'SMALL' | 'MEDIUM' | 'AUTO'
}

const MediaGrid = (props: IMediaGridProps) => {
  const items = props.items || []
  const page = props.page || 1
  const isLoading = props.isLoading || false
  const gridCols = props.gridCols ? `grid-cols-${props.gridCols}` : 'grid-cols-5'

  const setPage = (page: number) => {
    props.setPage(page)
  }

  return (
    <div className="w-full">
      {!isLoading ? 
        (
          <>
            <div className={`grid ${gridCols} gap-8`}>
              {
                items.length > 0 && items.map((media: any, index: number) => {
                  return <MediaCard size={props.size} key={index} item={media} mediaType={props.mediaType} />
                })
              }
            </div>
            <div className='flex justify-center items-center w-full py-8'>
              <Pagination 
                classNames={ { control: 'text-white data-active:!bg-yellow-500 hover:!bg-white data-active:bg-yellow-500 data-active:text-black hover:text-black' }} 
                total={props.totalPages > 500 ? 500 : props.totalPages} 
                value={page}
                onChange={setPage}
              />
            </div>
          </>
        )
        :
        <div className="flex items-center justify-center min-h-[76vh] w-full">
          <Loading />
        </div>

      }
      
    </div>
  )
}

export default MediaGrid