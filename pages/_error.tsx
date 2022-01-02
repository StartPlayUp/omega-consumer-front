import { GetStaticPaths, NextPageContext } from "next";
import Router from "next/router";
import React, { Component, useEffect } from "react";



const Error = ({ statusCode }: any) => {

    useEffect(() => {
        Router.push("/");
    }, [])

    return (
        <p>
            {statusCode
                ? `An error ${statusCode} occurred on server`
                : "An error occurred on client"}
        </p>
    );
};

export const getStaticProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return {
        props: { statusCode }
    };
};
export default Error