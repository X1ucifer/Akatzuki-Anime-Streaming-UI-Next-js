import React, { useContext, useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import axios from "axios"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Context } from "../../context";
import { useRouter } from "next/router";
import Link from "next/link";

const useStyles = makeStyles({
	root: {
		maxWidth: 300,
		background: "linear-gradient(to right, #000000, #434343)",
		color: "white",

	},
});



function Content() {

	const { state, dispatch } = useContext(Context);
	const { user } = state;

	const router = useRouter();

	const [series, setSeries] = useState("")

	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;

	const fetchdata = async () => {
		if (user !== null) {
			const { data } = await axios.get(`/api/v1/admin/series`, { headers: { Authorization: 'Bearer ' + user.accessToken } })

			console.log("-->", data)
			console.log("-->", user.accessToken)
			setSeries(data)
		} else {
			router.push("/")
		}


	}

	useEffect(() => {
		fetchdata();
	}, [])




	const handledelete = async (id) => {
		const answer = window.confirm("Are you sure you want to delete?");
		if (!answer) return;
		const { data } = await axios.delete(`/api/v1/seriesdelete?id=${id}`, { headers: { Authorization: 'Bearer ' + user.accessToken } })
		fetchdata();
	}

	return (
		<div className={styles.contentcontainer}>
			<div className={styles.contentwrapper1}>
				{series && series.map(value =>
				(
					<>
						<div >
							<Card className={classes.root}>
								<CardActionArea>
									<CardMedia
										component="img"
										alt="Contemplative Reptile"
										height="140"
										image={value.image}
										title="images"
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2" style={{ textTransform: "uppercase" }}>
											{value.title}
										</Typography>
										<Typography variant="body2" color="textSecondary" component="p" style={{ color: "white" }}>
											{value.description.substring(0, 120)} {value.description.length >= 120 && '...'}
										</Typography>
									</CardContent>
								</CardActionArea>
								<CardActions>

									<Button size="small" color="secondary" onClick={() => handledelete(value.id)}>
										Delete
									</Button>

									<Link href={{
										pathname: '/admin/edit/[id]',
										query: { id: value.id },
									}}>
										<Button size="small" style={{ color: "slateblue" }} >
											ADD/EDIT
										</Button>
									</Link>

								</CardActions>
							</Card>
						</div>
					</>
				)
				)}

			</div>

		</div>
	);
}

export default Content;