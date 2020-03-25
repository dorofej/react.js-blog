import React from 'react';

const About = (props) => {
  return (
    <div className="jumbotron m-0">
      <h3>Short description</h3>
      <div>
        It's a mini-blog with a list of articles where you can
        click on the article and see it separately. From above
        on the page of the list of articles you can use an input with
        search by titles and text.
      </div>
      <div>
        The post page contains the following:
        information about the user who created this article and
        list of comments on this article.
      </div>

      <h3 className="mt-4">Technology stack</h3>
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            <li className="list-group-item list-group-item-action">React</li>
            <li className="list-group-item list-group-item-action">Redux-Saga</li>
            <li className="list-group-item list-group-item-action">RxJS</li>
            <li className="list-group-item list-group-item-action">Bootstrap</li>
            <li className="list-group-item list-group-item-action">React Router</li>
            <li className="list-group-item list-group-item-action">Webpack</li>
          </ul>
        </div>
      </div>

      <h4 className="mt-4">Notes</h4>
      <div>
        The <a href="https://jsonplaceholder.typicode.com">https://jsonplaceholder.typicode.com</a>
        {' '}is used as mock server.
      </div>
      <div>
        The source code lives <a href="https://github.com/dorofej/react.js-blog">here</a>.
      </div>
    </div>
  );
};

export default About;
