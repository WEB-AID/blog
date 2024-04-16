import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ConfigProvider, Pagination, PaginationProps } from 'antd'
import { ScrollBtn } from './ui'
import { getPosts, setPage } from './model/slice/index'
import { Post } from '../../entities/Post'
import { FetchStatus } from '../../shared/api'
import { useAppDispatch, useAppSelector } from '../../shared/hooks'
import Flex from '../../shared/ui/Flex'
import FlexUl from '../../shared/ui/FlexUl'
import { Loader } from '../../shared/ui/Loader'

const Home = () => {
   const { isLogged } = useAppSelector((state) => state.signInForm)
   const { posts, status, postsCount, currentPage } = useAppSelector(
      (state) => state.posts
   )
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const [btn, setBtn] = useState<string>('Down')
   const params = Number(useParams().page)

   useEffect(() => {
      if (params > 1 && !Number.isNaN(params)) {
         dispatch(getPosts(20 * params - 20))
      } else {
         dispatch(getPosts(20 * currentPage - 20))
      }
   }, [currentPage, dispatch, params, isLogged])

   useEffect(() => {
      window.scrollTo({ top: 0 })

      function getPos() {
         const lastScrollTop = window.scrollX
         const st = window.scrollY - 150
         if (st > lastScrollTop) {
            setBtn('Up')
         } else {
            setBtn('Down')
         }
      }
      window.addEventListener('scroll', getPos)
      return () => window.removeEventListener('scroll', getPos)
   }, [])

   function scrollTo() {
      if (btn === 'Up') {
         window.scrollTo({ behavior: 'smooth', top: 0 })
      }
      if (btn === 'Down') {
         const height = document.body.scrollHeight
         window.scroll({ top: height, behavior: 'smooth' })
      }
   }

   const onPageChanged: PaginationProps['onChange'] = (value) => {
      navigate(`/articles/${value}`)
      dispatch(setPage(value))
   }

   const list = useMemo(() => {
      return posts?.map((el: any) => {
         const { slug, favorited, ...rest } = el
         const { username, image } = el.author
         return (
            <Post
               favorited={favorited}
               slug={slug}
               key={slug}
               username={username}
               img={image}
               {...rest}
            />
         )
      })
   }, [posts])
   const isLoading = status === FetchStatus.Loading

   return (
      <ConfigProvider
         theme={{
            components: {
               Pagination: {
                  colorBgContainer: 'transparent',
                  colorBorder: '#1890ff',
                  colorPrimary: '#1890ff',
                  colorBgTextHover: 'rgb(24, 144, 255, 0.3)',
               },
            },
         }}
      >
         <Flex $w="100%" $dir="column" $align="center">
            <>
               {posts?.length > 10 ? (
                  <ScrollBtn
                     $down={btn === 'Down' ? true : false}
                     onClick={scrollTo}
                  >
                     {btn}
                  </ScrollBtn>
               ) : (
                  ''
               )}
            </>

            <FlexUl
               $h="100%"
               $w="70%"
               $self="center"
               $align="center"
               $padding="100px 0 50px 0"
               $gap="26px"
               $justify="flex-start"
            >
               {isLoading ? <Loader /> : list}
            </FlexUl>
            <Flex $padding="0 0 20px 0">
               {status !== FetchStatus.Loading ? (
                  <Pagination
                     onChange={onPageChanged}
                     current={params ? params : currentPage}
                     total={postsCount || 0}
                     showSizeChanger={false}
                     pageSize={20}
                  />
               ) : null}
            </Flex>
         </Flex>
      </ConfigProvider>
   )
}

export default Home
