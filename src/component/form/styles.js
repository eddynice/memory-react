import { makeStyles } from '@material-ui/core/styles';



export default makeStyles((theme) => ({
    root: {
        '&.mulTextField-root': {
            margin: theme.spacing(1),
        },

    },
    paper: {
        padding: theme.spacing(2),

    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',



    },
    text: {
        padding: '5px',
    },


    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
    buttonSubmit: {
        marginBottom: 10,

    }
}))