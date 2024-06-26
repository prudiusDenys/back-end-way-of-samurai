import {Request, Response, Router} from 'express';
import {handleVideoErrors} from '../utils/handleErrors';

export const videosRouter = Router({})

export let videos: VideoViewModel[] = []

export enum Resolutions {
  P144 = 'P144',
  P240 = 'P240',
  P360 = 'P360',
  P480 = 'P480',
  P720 = 'P720',
  P1080 = 'P1080',
  P1440 = 'P1440',
  P2160 = 'P2160'
}

export interface VideoViewModel {
  id: number
  title: string
  author: string
  canBeDownloaded: boolean
  minAgeRestriction: null | number
  createdAt: string,
  publicationDate: string
  availableResolutions: Resolutions[]
}

videosRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json(videos)
})
videosRouter.get('/:id', (req: Request, res: Response) => {
  const video = videos.find(video => video.id === +req.params.id)

  if (video) return res.status(200).json(video)
  res.send(404)
})
videosRouter.post('/', (req: Request, res: Response) => {
  const {title, author, availableResolutions} = req.body
  const date = new Date()

  const errorMessage = handleVideoErrors.postErrors(title, author, availableResolutions)

  if (errorMessage.errorsMessages.length) return res.status(400).json(errorMessage)

  const newVideo: VideoViewModel = {
    id: Number(date),
    title,
    author,
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: date.toISOString(),
    publicationDate: new Date(date.getTime() + 86400000).toISOString(),
    availableResolutions
  }

  videos.push(newVideo)

  res.status(201).json(newVideo)
})
videosRouter.put('/:id', (req: Request, res: Response) => {
  const {
    title,
    author,
    availableResolutions,
    canBeDownloaded,
    minAgeRestriction,
    publicationDate
  } = req.body

  const errorMessage = handleVideoErrors.putErrors(
    title, author, availableResolutions,
    canBeDownloaded, minAgeRestriction, publicationDate
  )

  if (errorMessage.errorsMessages.length) return res.status(400).json(errorMessage)

  const video = videos.find(video => video.id === +req.params.id)

  if (video) {
    video.title = title
    video.author = author
    video.availableResolutions = availableResolutions
    video.canBeDownloaded = canBeDownloaded
    video.minAgeRestriction = minAgeRestriction
    video.publicationDate = publicationDate

    return res.send(204)
  }
  res.send(404)
})
videosRouter.delete('/:id', (req: Request, res: Response) => {
  const video = videos.find(video => video.id === +req.params.id)

  if (video) {
    videos = videos.filter(video => video.id !== +req.params.id)
    return res.send(204)
  }
  res.send(404)
})
