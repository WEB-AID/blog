import React, { FC } from "react";
import { CreateAndEditPostEntity } from "../../entities/CreateAndEditForm";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../shared/hooks";

export const EditPostWidget: FC = () => {
    const slug = useParams().id!
    const { title, description, tagList, body }: any = useAppSelector(
       (state) => state.getAndDeletePost
    )

    return <CreateAndEditPostEntity 
        slug={slug}
        tags={tagList}
        body={body}
        description={description}
        title={title}
    />
}