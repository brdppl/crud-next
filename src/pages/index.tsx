import { Button, Container, Fab, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Tooltip } from '@material-ui/core'
import Head from 'next/head'
import { useEffect } from 'react'
import { useState } from 'react'
import EditModal from '../components/edit-modal/EditModal'
import Loader from '../components/loader/Loader'
import { News } from '../models/news.model'
import { list, remove } from '../services/api'
import styles from  '../styles/Home.module.scss'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddModal from '../components/add-modal/AddModal'

export default function Home() {
  const [news, setNews] = useState<News[]>([])
  const [addOpen, setAddOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [modalData, setModalData] = useState<any>({})

  const openAddModal = () => {
    setAddOpen(true)
  }

  const handleAddModalClose = (res: boolean) => {
    setAddOpen(false)
    if(res) listNews()
  }

  const openEditModal = (item: any) => {
    setEditOpen(true)
    setModalData(item)
  }

  const handleEditModalClose = (res: boolean) => {
    setEditOpen(false)
    if(res) listNews()
  }

  const del = async (item: any) => {
    if(confirm('Deseja mesmo excluir este item?')) {
      const res = await remove(item.id)
      const status = await res.data.status
      if(status) listNews()
    }
  }

  async function listNews() {
    const res = await list()
    const data = await res.data.data
    setData(data)
  }

  function setData(data: any) {
    const news: News[] = new Array<News>()

    data.forEach((el: any) => {
      const item: News = new News()
      item.id = el._id
      item.title = el.title
      item.author = el.author
      item.content = el.content
      item.img = el.img
      item.active = el.active
      item.createdAt = el.createdAt
      item.updatedAt = el.updatedAt
      news.push(item)
    })
    setNews(news)
  }

  useEffect(() => {
    listNews()
  }, [])

  return (
    <Container maxWidth="lg">
      <Head>
        <title>Next.js CRUD Example</title>
        <meta name="description" content="An Next.js CRUD example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div>
        <h1>CRUD com Next.js!</h1>
        <List>
          {
            !news.length ?
            <Loader /> :
            news.map((item: any, index: number) => (
            <ListItem key={index}>
              <ListItemText primary={item.title} secondary={item.author} />
              <ListItemSecondaryAction>
                <Tooltip title="Editar">
                  <IconButton edge="end" aria-label="delete" onClick={() => openEditModal(item)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                  <IconButton edge="end" aria-label="delete" onClick={() => del(item)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
            ))
          }
        </List>
      </div>

      <Tooltip title="Adicionar">
        <Fab className={styles.addButton} color="primary" aria-label="add" onClick={openAddModal}>
          <AddIcon />
        </Fab>
      </Tooltip>

      <AddModal open={addOpen} onClose={handleAddModalClose} />
      <EditModal open={editOpen} onClose={handleEditModalClose} data={modalData} />
    </Container>
  )
}
