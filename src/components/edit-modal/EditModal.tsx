import { Button, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField, Theme } from '@material-ui/core'
import { useEffect } from 'react'
import { useState } from 'react'
import { update } from '../../services/api'
import Loader from '../loader/Loader'

export interface SimpleDialogProps {
  open: boolean
  onClose: (value: boolean) => void
  data?: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > .MuiDialogContent-root': {
        display: 'flex',
        gap: '15px',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column'
        }
      },
    },
  }),
)

export default function EditModal(props: SimpleDialogProps) {
  const classes = useStyles()
  const { onClose, open, data } = props
  const initialNews: any = {
    title: data.title,
    author: data.author,
    content: data.content,
    img: data.img,
    active: data.active
  }

  const [newsForm, setNewsForm] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setNewsForm(initialNews)
  }, [data])

  const handleClose = (res: boolean) => {
    onClose(res)
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    update(data.id, newsForm)
    .then(res => {
      if(res.data.status) handleClose(true)
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setNewsForm({ ...newsForm, [name]: value })
  }
  
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} maxWidth="sm" fullWidth={true}>
      <DialogTitle id="simple-dialog-title">Editar {data!.title}</DialogTitle>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
        <DialogContent>
          <TextField id="title" name="title" label="Título" variant="filled" fullWidth={true} value={newsForm.title} onChange={handleInputChange} />
          <TextField id="author" name="author" label="Autor" variant="filled" fullWidth={true} value={newsForm.author} onChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained" disableElevation color="primary" disabled={isLoading}>
            {isLoading ? <Loader size={23} /> : 'Salvar'}
          </Button>
          <Button onClick={() => handleClose(false)}>Fechar</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}