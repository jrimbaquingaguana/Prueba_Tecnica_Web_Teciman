function EmptyState({ message = "No hay registros disponibles todavía." }) {
  return (
    <div className="empty-state">
      <h3>Sin datos</h3>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;