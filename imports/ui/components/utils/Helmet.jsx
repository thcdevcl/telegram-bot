import React from "react";
import { Helmet } from "react-helmet-async";

export default ({ title, name, content }) => (
  <Helmet>
    <title>{`${Meteor.settings.public.app.NAME_SHORT} | ${title}`}</title>
    <meta name={name} content={content} />
  </Helmet>
);
