// import React, { Component } from "react";
// import axios from "axios";
// import { Usernow } from "../../redux/slice/authSlice";

// interface PolicyProps {
//   user: Usernow | null; // пропс пока не используется, но может пригодиться
// }

// interface PolicyState {
//   show: boolean;
//   content: string | null;
// }

// export default class Policy extends Component<PolicyProps, PolicyState> {
//   private mounted: boolean = false;

//   constructor(props: PolicyProps) {
//     super(props); // обязательно передаём props в родительский конструктор
//     this.state = {
//       show: true,
//       content: null,
//     };
//     this.refresh = this.refresh.bind(this);
//   }

//   componentDidMount() {
//     this.mounted = true;
//     this.refresh();
//   }

//   componentWillUnmount() {
//     this.mounted = false;
//   }

//   refresh() {
//     axios
//       .get("/policy")
//       .then((response) => {
//         if (this.mounted) {
//           this.setState({ content: response.data });
//         }
//       })
//       .catch((error) => {
//         console.error("Ошибка загрузки политики:", error);
//         // здесь можно добавить обработку ошибки (например, показать сообщение)
//       });
//   }

//   render() {
//     return (
//       <div>
//         <div>
//           <div dangerouslySetInnerHTML={{ __html: this.state.content || "" }} />
//         </div>
//       </div>
//     );
//   }
// }

import React, { Component } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import axios from "axios";

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PolicyModalState {
  content: string | null;
  loading: boolean;
}

export default class Policy extends Component<
  PolicyModalProps,
  PolicyModalState
> {
  private mounted: boolean = false;

  constructor(props: PolicyModalProps) {
    super(props);
    this.state = {
      content: null,
      loading: true,
    };
    this.fetchPolicy = this.fetchPolicy.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    if (this.props.isOpen) {
      this.fetchPolicy();
    }
  }

  componentDidUpdate(prevProps: PolicyModalProps) {
    if (this.props.isOpen && !prevProps.isOpen) {
      this.fetchPolicy();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  fetchPolicy() {
    this.setState({ loading: true });
    axios
      .get("/policy.html")
      .then((response) => {
        if (this.mounted) {
          const html = response.data;
          // Извлекаем содержимое тега body
          const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
          if (match) {
            this.setState({ content: match[1], loading: false });
          } else {
            this.setState({ content: html, loading: false });
          }
        }
      })
      .catch((error) => {
        console.error("Ошибка загрузки политики:", error);
        if (this.mounted) {
          this.setState({
            content: "<p>Ошибка загрузки содержимого</p>",
            loading: false,
          });
        }
      });
  }

  render() {
    const { isOpen, onClose } = this.props;
    const { content, loading } = this.state;

    if (!isOpen) return null;

    // ✅ Рендерим через createPortal в document.body
    return createPortal(
      <>
        {/* Оверлей */}
        <div className="fixed inset-0 bg-black/50 z-[9999]" onClick={onClose} />

        {/* Модальное окно */}
        <div className="fixed inset-0 flex items-center justify-center z-[10000] p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
            {/* Заголовок */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gray-50 flex-shrink-0">
              <h2 className="text-xl font-semibold text-gray-800">
                Политика конфиденциальности
              </h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            {/* Содержимое */}
            <div className="p-6 overflow-y-auto flex-1">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="w-8 h-8 border-4 border-[#46abf1] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: content || "<p>Нет содержимого</p>",
                  }}
                />
              )}
            </div>

            {/* Кнопка закрытия внизу */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center flex-shrink-0">
              <span className="text-sm text-gray-500">
                Нажимая «Закрыть», вы подтверждаете ознакомление с политикой
              </span>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#46abf1] text-white rounded-lg hover:bg-[#3a8fd4] transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </>,
      document.body, // ← портал в body
    );
  }
}
