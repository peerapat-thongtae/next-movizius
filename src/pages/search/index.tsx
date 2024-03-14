// import PosterImage from "@/components/Shared/PosterImage";
import MediaCard from "@/components/media/MediaCard";
import Loading from "@/components/common/Loading";
import { Pagination, Tabs } from "@mantine/core";
import queryString from "query-string";
import { useEffect, useMemo, useState } from "react";
import { ImSpinner } from "react-icons/im";
import { useSearchParams } from 'next/navigation'
import { useSearch } from "@/shared/hooks/useMedia";
import MediaGrid from "@/components/media/MediaGrid";
import Head from "next/head";

const SearchMoviePage = () => {
  const searchParams = useSearchParams();

  const searchString = searchParams.get('name') as string
  const [activeTab, setActiveTab] = useState<string | null>("movies");

  return (
    <div className="p-12">
      <Head>
        <title>Search : {searchString}</title>
      </Head>
      <div>
        <Tabs keepMounted={false} unstyled onTabChange={setActiveTab} classNames={{ root: 'flex', panel: '', tabIcon: '', tabsList: 'w-auto flex flex-col text-center text-white font-bold p-1 mx-4', tab: 'data-[active=true]:bg-pink-500 w-[20vw] h-[6vh] border-yellow-200 border-[0.5px] text-white py-4 cursor-pointer hover:bg-pink-500' }} value={activeTab}>
          <Tabs.List>
            <Tabs.Tab value="movies" >
              <div className="flex justify-between px-4">
                <div>Movies</div>
                {/* <span className="">{!dataQueryMovies.isLoading ? dataQueryMovies.medias?.total_results?.toLocaleString() : <ImSpinner className="animate-spin" color="yellow" size={20} />}</span> */}
              </div>
            </Tabs.Tab>
            <Tabs.Tab value="tv">
              <div className="flex justify-between px-4">
                <div>TV</div>
                {/* <span className="">{ !dataQueryTV.isLoading ? dataQueryTV?.medias?.total_results?.toLocaleString() : <ImSpinner className="animate-spin" color="yellow" size={20} />}</span> */}
              </div>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="movies">
            <TabData mediaType={'movie'} searchString={searchString} />
          </Tabs.Panel>

          <Tabs.Panel value="tv">
            <TabData mediaType={'tv'} searchString={searchString} />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}

const TabData = (props: any) => {
  const mediaType = props.mediaType
  const searchString = props.searchString

  const dataQuery = useSearch(searchString, mediaType)

  useEffect(() => {
    dataQuery.setPage(1)
  }, [searchString])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dataQuery.page]);

  
  return (
    <div className="px-4 min-w-[70vw]">
      <MediaGrid size="MEDIUM" gridCols={4} items={dataQuery?.medias?.results} page={dataQuery.page} isLoading={dataQuery.isLoading} setPage={dataQuery.setPage} totalPages={dataQuery.medias?.total_pages} totalResults={dataQuery.medias?.total_results} />
    </div>
  )
}

export default SearchMoviePage;