import MediaGrid from "@/components/media/MediaGrid";
import { useDiscoverMedia } from "@/shared/hooks/useMedia";
import dayjs from "dayjs";

const SchedulePage = () => {
  const dateStart = dayjs('2024-03-15').format('YYYY-MM-DD')
  const dateEnd = dayjs('2024-03-30').format('YYYY-MM-DD')
  const media = useDiscoverMedia('movie', { region: 'TH', "release_date.gte": dateStart, "release_date.lte": dateEnd})
  return (
    <div className="mt-24 p-12">
      <MediaGrid items={media.medias?.results} totalResults={media.medias?.total_results} totalPages={media.medias?.total_pages} page={media.page} isLoading={media.isLoading} setPage={media.setPage}  />
    </div>
  )
}

export default SchedulePage;