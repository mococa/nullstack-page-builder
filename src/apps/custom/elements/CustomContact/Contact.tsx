import Nullstack, { NullstackClientContext } from 'nullstack';
import './styles.scss';

interface Props {
  values: {
    section_title: string;
    title: string;
    subtitle: string;
  };
}

export class Contact extends Nullstack {
  email: string = '';
  name: string = '';
  message: string = '';

  render({ values }: NullstackClientContext<Props>) {
    return (
      <section id="custom-contact">
        <div class="heading">
          <a href="#contact">{values.section_title}</a>
          <b>{values.title}</b>
          <span>{values.subtitle}</span>
        </div>

        <form onsubmit={({ event }) => event.preventDefault()}>
          <label htmlfor="name" class="form-input">
            <span>Name</span>
            <input
              type="text"
              name="name"
              required
              data-value={this.name}
              bind={this.name}
            />
          </label>

          <label htmlfor="email" class="form-input">
            <span>E-mail</span>
            <input
              type="email"
              name="email"
              required
              data-value={this.email}
              bind={this.email}
            />
          </label>

          <label htmlfor="message" class="form-input">
            <span>Write your message</span>
            <textarea
              name="message"
              rows={5}
              required
              data-value={this.message}
              bind={this.message}
            ></textarea>
          </label>

          <button type="submit">
            Send message
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.83401 4.73441C9.98403 4.58444 10.1875 4.50018 10.3996 4.50018C10.6117 4.50018 10.8152 4.58444 10.9652 4.73441L14.1652 7.93441C14.3152 8.08443 14.3994 8.28788 14.3994 8.50001C14.3994 8.71214 14.3152 8.91559 14.1652 9.06561L10.9652 12.2656C10.8143 12.4113 10.6122 12.492 10.4025 12.4902C10.1927 12.4883 9.99208 12.4042 9.84376 12.2559C9.69543 12.1075 9.61129 11.9069 9.60947 11.6971C9.60765 11.4874 9.68828 11.2853 9.83401 11.1344L11.6684 9.30001H2.39961C2.18744 9.30001 1.98395 9.21573 1.83392 9.0657C1.68389 8.91567 1.59961 8.71219 1.59961 8.50001C1.59961 8.28784 1.68389 8.08436 1.83392 7.93433C1.98395 7.7843 2.18744 7.70001 2.39961 7.70001H11.6684L9.83401 5.86561C9.68403 5.71559 9.59978 5.51214 9.59978 5.30001C9.59978 5.08788 9.68403 4.88443 9.83401 4.73441Z"
                fill="#1A202C"
              ></path>
            </svg>
          </button>
        </form>
      </section>
    );
  }
}
