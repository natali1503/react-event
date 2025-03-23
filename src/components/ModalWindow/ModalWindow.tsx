import { Button, Dialog, DialogActions, DialogContent, Slide, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

interface IModalWindowProps {
  openFilterModal: boolean;
  handleCloseFilterModal: () => void;
  children: ReactNode;
  slideDirection: 'right' | 'left' | 'up' | 'down' | undefined;
}

const ModalWindow: FC<IModalWindowProps> = (props) => {
  const { openFilterModal, handleCloseFilterModal, children, slideDirection } = props;

  return (
    <Dialog
      open={openFilterModal}
      onClose={handleCloseFilterModal}
      sx={{
        '& .MuiDialog-paper': {
          position: 'absolute',
          height: '100%',
          maxHeight: '100%',
          width: 'fit-content',
          top: '0',
          right: 0,
          margin: '0',
        },
      }}
    >
      <Slide direction={slideDirection} in={openFilterModal}>
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            padding: '0',
            overflowY: 'scroll',
          }}
        >
          {children}
        </DialogContent>
      </Slide>
      <DialogActions
        sx={{
          paddingTop: '2rem',
        }}
      >
        <Button onClick={handleCloseFilterModal} color='primary'>
          <Typography>Закрыть</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalWindow;
