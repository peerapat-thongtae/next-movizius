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
import styled from 'styled-components'
import { FaPlayCircle } from "react-icons/fa";
import ModalVideo from "react-modal-video"
import { MediaDetail } from "@/components/media/MediaDetail"
import Head from "next/head"

const LoadingDiv = () => {
  return (
    <div className="min-h-[90vh] h-full flex items-center justify-center w-full">
      <Loading />
    </div>
  )
}

const MovieDetailPage = (props: any) => {
  const id = props.id
  const type = props.mediaType
  const { media, isLoading } = useMediaDetail(id, type)

  const render = () => {
    if(isLoading) {
      return <LoadingDiv />
    }

    if(media) {
      return <MediaDetail media={media} />
    }
  }
  return (
    <>
      <Head>
        <title>{id} {media?.title}</title>
      </Head>
      {
        render()
      }
    </>
  )
}

MovieDetailPage.getInitialProps = async ({ query }: any) => {
  const { id, mediaType } = query

  return { id, mediaType }
}



export default MovieDetailPage

// reference : https://i.pinimg.com/originals/15/6d/17/156d1767b6d5242157ba1e83d21f4aa5.png