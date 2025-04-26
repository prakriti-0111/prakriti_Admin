import React from 'react';
import { CardContent, Typography, CircularProgress } from '@mui/material';

/**
 * Reusable Dashboard Card component
 * @param {Object} props - Component props
 * @param {string} props.title - Card title
 * @param {string|number} props.value - Main value to display
 * @param {string|number} props.badge - Optional badge value
 * @param {string} props.route - Route to navigate to on click
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.bgColorClass - Background color class
 * @param {string} props.textColorClass - Text color class
 * @param {string} props.iconClass - Icon class
 * @param {string} props.iconBgClass - Icon background class
 * @param {boolean} props.isLoading - Whether data is loading
 */
const DashboardCard = ({
  title,
  value,
  badge,
  route,
  onClick,
  bgColorClass = 'bg-gray-200',
  textColorClass = 'text-gray-950',
  iconClass = 'bi-wallet',
  iconBgClass = 'bg-gray-300',
  isLoading = false,
}) => {
  const handleClick = () => {
    if (onClick && route) {
      onClick(route);
    }
  };


  return (
    <CardContent
      onClick={handleClick}
      className={`dashboard_card_content ${bgColorClass} shadow-sm hover:shadow-lg transform transition-transform hover:-translate-y-1 rounded p-4`}
      sx={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <Typography
        sx={{ fontSize: 14, margin: 0 }}
        color="text.secondary"
        gutterBottom
        component="span"
      >
        <h1 className={`text-xl ${textColorClass}`}>
          {title}
          {badge && (
            <>
              &nbsp;{' '}
              <span className="badge bg-opacity-75 text-bg-dark">
                {isLoading ? <CircularProgress size="15px" color="inherit" /> : badge}
              </span>
            </>
          )}
        </h1>
        <h2 className="text-dark sm:text-xl text-lg font-bold">
          {isLoading ? (
            <CircularProgress size="20px" />
          ) : (
            <span>{value}</span>
          )}
        </h2>
      </Typography>
      <div className="card-icon">
        <i className={`bi ${iconClass} ${textColorClass} p-2 px-3 ${iconBgClass} rounded-circle`}></i>
      </div>
    </CardContent>
  );
};

export default DashboardCard;
