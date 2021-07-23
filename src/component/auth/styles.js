import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
    papper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
    },
    root: {
        '&.mulTextField-root': {
            margin: theme.spacing(2),
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,


    },

    form: {
        width: '100%',
        marginTop: theme.spacing(3),


    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    text: {
        padding: '5px',
    },
    googleButton: {
        marginBottom: theme.spacing(2)
    },

    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
    buttonSubmit: {
        marginBottom: 10,

    }
}))