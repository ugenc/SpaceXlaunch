import React, { Component, Fragment, StrictMode } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

const LAUNCH_QUERY = gql`
	query LaunchQuery($flight_number: String!) {
		launch(flight_number: $flight_number) {
			flight_number
			mission_name
			launch_year
			launch_success
			launch_date_local
			rocket {
				rocket_id
				rocket_name
				rocket_type
			}
		}
	}
`;

export function Launch({ flight_number }) {
	let params = useParams();
	console.log(params.flight_number);
	flight_number = params.flight_number.toString();
	const { loading, error, data } = useQuery(LAUNCH_QUERY, {
		variables: { flight_number },
	});
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const {
		mission_name,
		launch_year,
		launch_success,
		rocket: { rocket_id, rocket_name, rocket_type },
	} = data.launch;

	return (
		<div>
			<h1 className="display-4 my-3">
				<span className="text-dark">Mission </span>
				{mission_name}
			</h1>
			<h4 className="mb-3">Launch Details</h4>
			<ul className="list-group">
				<li className="list-group-item">Flight Number: {flight_number}</li>
				<li className="list-group-item">Launch Year: {launch_year}</li>
				<li className="list-group-item">
					Launch:{" "}
					<span
						className={classNames({
							"text-success": launch_success,
							"text-danger": !launch_success,
						})}
					>
						{launch_success ? "Successful" : "Failed"}
					</span>
				</li>
			</ul>
			<h4 className="my-3">Rocket Details</h4>
			<ul className="list-group">
				<li className="list-group-item">
					Rocket ID:<b> {rocket_id}</b>
				</li>
				<li className="list-group-item">
					Rocket Name:<b> {rocket_name}</b>
				</li>
				<li className="list-group-item">
					Rocket Type:<b> {rocket_type}</b>
				</li>
			</ul>
			<hr />
			<Link to="/" className="btn btn-secondary">
				Back
			</Link>
		</div>
	);
}
