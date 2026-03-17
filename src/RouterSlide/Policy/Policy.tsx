import React, { Component } from 'react';
import axios from 'axios';
import { Usernow } from '../../redux/authSlice';

interface PolicyProps {
  user: Usernow | null; // пропс пока не используется, но может пригодиться
}

interface PolicyState {
  show: boolean;
  content: string | null;
}

export default class Policy extends Component<PolicyProps, PolicyState> {
  private mounted: boolean = false;

  constructor(props: PolicyProps) {
    super(props); // обязательно передаём props в родительский конструктор
    this.state = {
      show: true,
      content: null
    };
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.refresh();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  refresh() {
    axios.get('/policy')
      .then(response => {
        if (this.mounted) {
          this.setState({ content: response.data });
        }
      })
      .catch(error => {
        console.error('Ошибка загрузки политики:', error);
        // здесь можно добавить обработку ошибки (например, показать сообщение)
      });
  }

  render() {
    return (
      <div>
        <div>
          <div dangerouslySetInnerHTML={{ __html: this.state.content || '' }} />
        </div>
      </div>
    );
  }
}