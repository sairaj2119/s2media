import React, { useState } from 'react'
import { SessionUser } from '../../../types/user'
import { Avatar } from '../../atoms/Avatar'
import { IconButton } from '../../atoms/IconButton'

export interface PostHeadProps {
  user: SessionUser
  moreIcon: typeof React.Component
  caption?: string
}

export const PostHead = ({ user, moreIcon, caption }: PostHeadProps) => {
  const [seeMore, setSeeMore] = useState(false)
  const handleSeeMore = () => {
    setSeeMore(true)
  }

  return (
    <div>
      <div className="flex items-center justify-between px-2 py-3">
        <div className="flex items-center ">
          <Avatar src={user.avatar} w="w-10" h="h-10" alt="user profile image" />
          <div className="flex flex-col pl-2">
            <p className="font-semibold leading-5 text-gray-800 text-md">{user.username}</p>
            <p className="text-xs text-gray-500">2 min ago</p>
          </div>
        </div>
        <div>
          <IconButton w="w-4" h="h-4" icon={moreIcon} />
        </div>
      </div>
      {caption && (
        <div className="flex px-2 pb-2">
          <p
            className={`items-end leading-6 text-base flex-1 text-gray-700 ${
              !seeMore ? 'truncate' : ''
            }`}
          >
            {caption}
          </p>
          <div className={`${seeMore ? 'hidden' : ''}`}>
            <a
              className="text-sm text-gray-500 cursor-pointer hover:underline"
              onClick={handleSeeMore}
            >
              see more
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
