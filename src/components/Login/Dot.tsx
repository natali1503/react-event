import { Button } from '@mui/material';
import { useMode } from '../../theme';

export function Dot(props: { activ: boolean; onClick; disabled: boolean }) {
  const [theme] = useMode();
  return (
    <Button
      onClick={props.onClick}
      disabled={props.disabled}
      style={{
        padding: 0,
        minWidth: 0,
        width: '15px',
        height: '15px',
        backgroundColor: `${props.activ ? theme.palette.primary.main : theme.palette.secondary.main}`,
        borderRadius: '50%',
      }}
    ></Button>
  );
}
